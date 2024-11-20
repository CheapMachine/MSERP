frappe.pages['machine-shop-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Machine Shop Dashboard',
        single_column: true
    });

    let sections = [
        { label: 'Quote Processing', icon: 'fas fa-file-invoice-dollar', doctype: 'Quotation' },
        { label: 'Order Processing', icon: 'fas fa-box-open', doctype: 'Sales Order' },
        { label: 'Work Orders', icon: 'fas fa-cogs', doctype: 'Work Order' },
        { label: 'Inventory Control', icon: 'fas fa-warehouse', doctype: 'Item' },
        { label: 'Shipping', icon: 'fas fa-shipping-fast', doctype: 'Delivery Note' },
        { label: 'Cost Analysis', icon: 'fas fa-chart-line', doctype: 'Cost Analysis' },
        { label: 'Tool Management', icon: 'fas fa-tools', doctype: 'Tool' },
        { label: 'Employee Tracking', icon: 'fas fa-user-clock', doctype: 'Employee' }
    ];

    sections.forEach(section => {
        page.add_icon_button(section.label, function() {
            frappe.set_route('List', section.doctype);
        }, section.icon);
    });

    // Add button to allow users to modify icons
    page.add_action_icon('fas fa-edit', function() {
        frappe.prompt({
            label: 'Customize Dashboard',
            fieldname: 'section',
            fieldtype: 'Table',
            options: [
                { label: 'Label', fieldname: 'label', fieldtype: 'Data' },
                { label: 'Icon', fieldname: 'icon', fieldtype: 'Data' },
                { label: 'Doctype', fieldname: 'doctype', fieldtype: 'Link', options: 'DocType' }
            ]
        }, function(values) {
            sections = values;
            frappe.pages['machine-shop-dashboard'].refresh();
        }, 'Edit Dashboard Icons');
    });
};
