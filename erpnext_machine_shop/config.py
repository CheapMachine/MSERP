from frappe import _

def get_data():
    return [
        {
            "module_name": "Machine Shop",
            "color": "blue",
            "icon": "octicon octicon-tools",
            "type": "module",
            "label": _("Machine Shop")
        },
        {
            "module_name": "Work Order",
            "color": "green",
            "icon": "octicon octicon-file-directory",
            "type": "doctype",
            "link": "List/Work Order",
            "label": _("Work Order")
        },
        {
            "module_name": "Job Card",
            "color": "red",
            "icon": "octicon octicon-clippy",
            "type": "doctype",
            "link": "List/Job Card",
            "label": _("Job Card")
        },
        {
            "module_name": "Inventory Control",
            "color": "orange",
            "icon": "octicon octicon-package",
            "type": "doctype",
            "link": "List/Item",
            "label": _("Inventory Control")
        },
    ]
