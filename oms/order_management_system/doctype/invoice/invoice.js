// Copyright (c) 2023, Fais Nasrullah and contributors
// For license information, please see license.txt

frappe.ui.form.on("Invoice", {
  refresh: function (frm) {
    // Hide the "Add Row" button
    frm.fields_dict["order_items"].grid.wrapper.find(".grid-add-row").hide();

    // set a field as read only
    frm.set_df_property("subtotal", "read_only", 1);
    frm.set_df_property("total_diskon", "read_only", 1);
    frm.set_df_property("total_harga", "read_only", 1);
  },
  payment_date: function (frm) {
    const today = frappe.datetime.get_today();

    if (frm.doc.payment_date > today) {
      frm.set_value("payment_date", frappe.datetime.get_today());
      frappe.msgprint({
        title: __("Oops..."),
        indicator: "red",
        message: __("Payment Date Tidak Boleh Lebih Dari Tanggal Hari Ini"),
      });
    }

    if (frm.doc.payment_date < today) {
      frm.set_value("payment_date", frappe.datetime.get_today());
      frappe.msgprint({
        title: __("Oops..."),
        indicator: "red",
        message: __("Payment Date Tidak Boleh Kurang Dari Tanggal Hari Ini"),
      });
    }
  },
});
