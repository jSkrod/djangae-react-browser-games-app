### Djangae project template

This is a example template for Djangae projects for Google App Engine environment.
Configured to work out of the box on windows 8 machines. 

In plans to have a basic Vue.JS configuration with django rest framework & registration module.

### Project configuration

- libraries loaded from src/sitepackages
- [django-registration](http://django-registration.readthedocs.io/en/2.0.4/quickstart.html)
- [material design heavy-text template getmdl.io](https://getmdl.io/templates/index.html)

### Installation & Requirements

Tested on Google App Engine with Djangae 0.9.9 Alpha version and Django 1.8.12 final

- Download & place [djangae](https://potatolondon.github.io/djangae/) in src/sitepackages
- Download & place [django](https://www.djangoproject.com/download/) in src/sitepackages 
- Download & place [registration](https://pypi.python.org/pypi/django-registration/) module in src/registration
- Download & place [django-rest-framework](http://www.django-rest-framework.org/#) module in src/rest_framework
- Download & place [djang-rest-framework-docs](https://github.com/manosim/django-rest-framework-docs)  module in src/rest-framework-docs
- Move djang-rest-framework-docs static files to templates/static_files/rest_framework_docs and templates to templates/rest_framework_docs
- Python 2.7.5
- Google App Engine SDK for Python minimum 1.9.0
