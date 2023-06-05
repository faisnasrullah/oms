# Copyright (c) 2023, Fais Nasrullah and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Order(Document):
    def validate(self):
        if self.is_new():
            self.payment_status = "Not Paid"

        diskon = frappe.get_value("Master Membership", self.membership, "diskon")

        if not self.is_new():
            if self.subtotal > 0:
                total_diskon = self.subtotal * (diskon / 100)
                self.total_diskon = total_diskon

                total_harga = self.subtotal - self.total_diskon
                self.total_harga = total_harga
            else:
                self.total_diskon = 0
                self.total_harga = 0

        if len(self.order_items) == 0:
            self.subtotal = 0
            self.total_diskon = 0
            self.total_harga = 0

    def on_submit(self):
        invoice = frappe.new_doc("Invoice")
        invoice.order_date = self.order_date
        invoice.customer = self.customer
        invoice.customer_name = self.customer_name
        invoice.order_id = self.name

        invoice.shipping_address = self.shipping_info[0].shipping_address
        invoice.billing_address = self.shipping_info[0].billing_address

        for row in self.order_items:
            invoice.append(
                "order_items",
                {
                    "product_id": row.product_id,
                    "product_name": row.product_name,
                    "description": row.description,
                    "price": row.price,
                    "quantity": row.quantity,
                    "total_amount": row.total_amount,
                },
            )

        invoice.subtotal = self.subtotal
        invoice.total_diskon = self.total_diskon
        invoice.total_harga = self.total_harga
        invoice.save()
