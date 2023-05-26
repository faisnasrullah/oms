from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in oms/__init__.py
from oms import __version__ as version

setup(
	name="oms",
	version=version,
	description="This is Order Management System using Frappe Framework",
	author="Fais Nasrullah",
	author_email="fais.nasrullah@cargoshare.id",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
