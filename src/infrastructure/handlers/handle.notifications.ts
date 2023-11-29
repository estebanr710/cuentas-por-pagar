import * as fs from "fs";
import { SendMailData } from "../interfaces/main";
import axios from "axios";
import User from "../models/local.users.schema";

export class Notifications {

    /**
     * Cuando se crea la factura a todos los admin p1 
     * A los aprobadores cuando se les asigna una factura p2
     * Notificación cuando se gestione una factura a todos los admin p3
     * 
    */

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

            axios.request(CONFIG).then((response) => {
                console.log(JSON.stringify(response.data))
            }).catch((error) => {
                console.log(error);
            });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }    

    public createInvoiceNotification = async (inv_reference: number | undefined): Promise<void> => {
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

    public assignApproverNotification = async () => {
        try {
            
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public invoiceManagmentNotification = async () => {
        try {
            
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}