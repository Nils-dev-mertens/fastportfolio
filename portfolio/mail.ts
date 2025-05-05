import fs from "fs";
import { marked } from "marked";
import mustache from "mustache";
import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import schedule from "node-schedule";
import { Mail } from "./types";

dotenv.config();

let markdownTemplate: string;
const mailDictionary = new Map<string, Mail[]>();
const spamIPs = new Set<string>();
const MAX_MAILS_PER_IP = 5;

try {
    markdownTemplate = fs.readFileSync(path.join(__dirname, "form.md"), "utf8");
} catch (error) {
    console.error("Failed to load form.md template:", error);
    markdownTemplate = "";
}

async function generateEmail(data: any): Promise<string> {
    if (!data.mailsender || !data.text) {
        throw new Error("Missing required fields: 'mailsender' or 'text' in the data object.");
    }

    const populatedMarkdown = mustache.render(markdownTemplate, data);
    return await marked(populatedMarkdown);
}

export function queMail(ip: string, mailitem: Mail): boolean {
    if (spamIPs.has(ip)) {
        console.error(`IP ${ip} is banned from sending emails.`);
        return false;
    }

    const mailList = mailDictionary.get(ip) || [];
    if (mailList.length >= MAX_MAILS_PER_IP) {
        console.error(`IP ${ip} has exceeded the maximum allowed emails. Banning IP.`);
        spamIPs.add(ip);
        return false;
    }

    mailList.push(mailitem);
    mailDictionary.set(ip, mailList);
    return true;
}

async function sendEmail(to: string, subject: string, data: any) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const emailHtml = await generateEmail(data);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: emailHtml,
        });

        console.log("✅ Email verzonden:", info.response);
    } catch (error) {
        console.error("❌ Fout bij verzenden:", error);
    }
}

// Every 5 minutes, process the email queue
schedule.scheduleJob('*/5 * * * *', async function () {
    for (const [ip, messages] of mailDictionary.entries()) {
        for (const message of messages) {
            try {
                await sendEmail(
                    process.env.EMAIL_USER!, // All messages go to one email
                    `Nieuw bericht van ${message.mailsender}`,
                    { mailsender: message.mailsender, text: message.text }
                );
            } catch (error) {
                console.error(`Failed to send email for IP ${ip}:`, error);
            }
        }
    }

    // Clear the queue after processing
    for (const ip of mailDictionary.keys()) {
        mailDictionary.set(ip, []);
    }
});

// Daily reset of limits
schedule.scheduleJob('0 0 * * *', function () {
    mailDictionary.clear();
    spamIPs.clear();
});