#!/usr/bin/env python
from setuptools import setup, find_packages

# Setup for the machine shop ERPNext app
setup(
    name='erpnext_machine_shop',
    version='7.0.0',
    description='A custom ERPNext app for managing machine shop processes with aerospace and medical traceability.',
    author='Machine Shop Inc.',
    author_email='info@machineshop.com',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'erpnext',
    ],
)
