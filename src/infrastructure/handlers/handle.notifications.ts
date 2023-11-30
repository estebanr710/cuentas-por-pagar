import * as fs from "fs";
import { SendMailData } from "../interfaces/main";
import axios from "axios";
import User from "../models/local.users.schema";

export default class Notifications {

    private sendMessage = async ({ to, subject, template }: SendMailData): Promise<void> => {
        try {

            const SMTP_USER = process.env.SMTP_USER ?? '__default__';
            const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? '__default__';
            const SMTP_SET_FROM = process.env.SMTP_SET_FROM ?? '__default__';

            let data = JSON.stringify({
                authuser: SMTP_USER,
                authpass: SMTP_PASSWORD,
                from: `${SMTP_SET_FROM} <${SMTP_USER}>`,
                to,
                subject,
                html_content: template
            });

            const CONFIG = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.turbo-smtp.com/api/v2/mail/send',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data
            };

            const BLACKLIST = [
                "juan.rodriguez@spagrupoinmobiliario.com",
                "dayron.mazabuel@spagrupoinmobiliario.com",
                "santiago.lozano@spagrupoinmobiliario.com",
                "alberto.montes@spagrupoinmobiliario.com",
                "kevin.zapata@spagrupoinmobiliario.com"
            ];

            if (!BLACKLIST.includes(to)) {
                axios.request(CONFIG).then((response) => {
                    console.log(JSON.stringify(response.data))
                }).catch((error) => {
                    console.log(error);
                });
            };
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }    

    public createInvoiceNotification = async (inv_reference?: number): Promise<void> => {
        try {
            const ADMIN_ROLE = process.env.ADMIN_ROLE_ID ?? '__default__';

            let template = fs.readFileSync(`${__dirname}/../templates/create_invoice_template.html`).toString();

            template = template.replaceAll('{{inv_reference}}', String(inv_reference));

            const SUBJECT = `CXP - ¡Llegó una nueva factura!`;

            const ADMINS: any = await User.findAll({
                where: {
                    role_id: ADMIN_ROLE
                }
            });

            for (const e of ADMINS) {
                await this.sendMessage({
                    to: e.use_email,
                    subject: SUBJECT,
                    template
                });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public assignApproverNotification = async ({ to, inv_reference }: { to: string, inv_reference?: number }) => {
        try {
            let template = fs.readFileSync(`${__dirname}/../templates/assign_approver_template.html`).toString();

            template = template.replaceAll('{{inv_reference}}', String(inv_reference));

            const SUBJECT = `CXP - ¡Nueva factura asignada!`;

            await this.sendMessage({
                to,
                subject: SUBJECT,
                template
            });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public invoiceManagmentNotification = async ({ inv_reference, observation, managment }: { inv_reference?: number, observation: string, managment: string }) => {
        try {
            /**
             * Only for: [ APPROVE, REJECT, CANCEL, RETURN ]
             */
            const ADMIN_ROLE = process.env.ADMIN_ROLE_ID ?? '__default__';

            let template = fs.readFileSync(`${__dirname}/../templates/invoice_managment_template.html`).toString();

            template = template.replaceAll('{{inv_reference}}', String(inv_reference)).replaceAll('{{observation}}', observation).replaceAll('{{managment}}', managment);

            const SUBJECT = `CXP - ¡Factura gestionada!`;

            const ADMINS: any = await User.findAll({
                where: {
                    role_id: ADMIN_ROLE
                }
            });

            for (const e of ADMINS) {
                await this.sendMessage({
                    to: e.use_email,
                    subject: SUBJECT,
                    template
                });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}