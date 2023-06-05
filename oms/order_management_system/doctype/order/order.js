// Copyright (c) 2023, Fais Nasrullah and contributors
// For license information, please see license.txt

frappe.ui.form.on("Order", {
  //   refresh: function (frm) {
  //     // frappe.msgprint("Hello")
  //   },
  order_date: function (frm) {
    var today = frappe.datetime.get_today();
    if (frm.doc.order_date > today) {
      frm.set_value("order_date", frappe.datetime.get_today());
      frappe.throw(__("Tanggal Order tidak melebihi tanggal hari ini"));
    }
  },
  customer: function (frm) {
    frappe.call({
      method: "frappe.client.get_value",
      args: {
        doctype: "Master Customer",
        fieldname: ["shipping_address", "billing_address"],
        filters: {
          name: frm.doc.customer,
        },
      },
      callback: function (r) {
        var data = r.message;
        if (data) {
          var child = frm.add_child("shipping_info");
          console.log(data);
          if (data.shipping_address) {
            frappe.model.set_value(
              child.doctype,
              child.name,
              "shipping_address",
              data.shipping_address
            );
          }

          if (data.billing_address) {
            frappe.model.set_value(
              child.doctype,
              child.name,
              "billing_address",
              data.billing_address
            );
          }
          frm.refresh_field("shipping_info");
        }
      },
    });
  },
});

frappe.ui.form.on("Product Line", {
  quantity: function (frm, cdt, cdn) {
    var row = locals[cdt][cdn];

    var total_amount = row.quantity * row.price;
    row.total_amount = total_amount;

    // console.log("CHILD TABLE : ", frm.doc.order_items);
    var order_items = frm.doc.order_items;
    var temp_subtotal = 0;

    order_items.forEach(function (item) {
      temp_subtotal += item.total_amount;
    });

    frm.set_value("subtotal", temp_subtotal);
    frm.refresh_field("order_items");
  },
  before_order_items_remove: function (frm, cdt, cdn) {
    var row = locals[cdt][cdn];
    var subtotal = frm.doc.subtotal;
    if (row.quantity) {
      subtotal -= row.total_amount;
      frm.set_value("subtotal", subtotal);
    }
  },
});

cur_frm.set_query("product_id", "order_items", function (doc, cdt, cdn) {
  return {
    filters: [
      ["Master Product", "active", "=", "1"],
      ["Master Product", "stock_quantity", ">", 0],
    ],
  };
});
