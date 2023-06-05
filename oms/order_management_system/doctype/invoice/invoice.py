# Copyright (c) 2023, Fais Nasrullah and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Invoice(Document):
    def on_submit(self):
        if not self.payment_date:
            frappe.throw(title="Error", msg="Payment Date Harus di Isi")

        if self.payment_status == "Paid":
            for row in self.order_items:
                master_product = frappe.get_doc("Master Product", row.product_id)
                master_product.stock_quantity = (
                    master_product.stock_quantity - row.quantity
                )
                master_product.save()

            order_amount = frappe.get_value(
                "Master Customer", self.customer, "order_amount"
            )

            frappe.set_value(
                "Master Customer", self.customer, "order_amount", int(order_amount) + 1
            )

            self.update_membership()
            self.update_payment_status_order()

    def update_membership(self):
        order_amount = int(
            frappe.get_value("Master Customer", self.customer, "order_amount")
        )

        if order_amount >= 5 and order_amount <= 10:
            frappe.set_value("Master Customer", self.customer, "membership", "Silver")
        elif order_amount >= 10 and order_amount <= 15:
            frappe.set_value("Master Customer", self.customer, "membership", "Gold")
        elif order_amount >= 15 and order_amount <= 20:
            frappe.set_value("Master Customer", self.customer, "membership", "Platinum")

    def update_payment_status_order(self):
        frappe.set_value("Order", self.order_id, "payment_status", self.payment_status)
