erpnext.ui.form.on('Part', {
    validate: function(frm) {
        if (!frm.doc.part_print) {
            frappe.throw(__('Please upload the part print before saving.'));
        }
    }
});
