#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":

    env = os.getenv('DISTRIBUTED_API_ENVIRONMENT') or 'dev'
    if env not in ('dev', 'test', 'staging', 'prod'):
        env = 'dev'
    os.environ.setdefault("DISTRIBUTED_API_ENVIRONMENT", env)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings.%s" % env)

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
