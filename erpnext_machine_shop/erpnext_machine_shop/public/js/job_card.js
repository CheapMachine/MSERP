erpnext.ui.form.on('Job Card', {
    on_submit: function(frm) {
        if (!frm.doc.finished_part) {
            frappe.throw(__('Finished Part needs to be marked complete.'));
        }
        if (!frm.doc.traceability_requirements) {
            frappe.throw(__('Traceability requirements must be fulfilled for aerospace and medical jobs.'));
        }
    }
});
