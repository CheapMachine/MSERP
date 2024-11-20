erpnext.ui.form.on('Customer', {
    validate: function(frm) {
        if (!frm.doc.customer_name) {
            frappe.throw(__('Please provide a customer name.'));
        }
    }
});
