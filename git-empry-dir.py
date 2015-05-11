#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import argparse
import commands
import sys

def list(args):
    command = "find %(dir)s -type d -name .git -prune -o -type d -empty" % vars(args)
    result = commands.getstatusoutput(command)
    print result[1]
    if result[0] > 0:
        sys.exit(1)

def keep(args):
    command = "find %(dir)s -type d -name .git -prune -o -type d -empty -exec touch {}/%(keeper)s \;" % vars(args)
    result = commands.getstatusoutput(command)
    print result[1]
    if result[0] > 0:
        sys.exit(1)

def check_git_dir(dir):
    git_dir = dir + '/.git'
    if os.path.isdir(git_dir) == False or os.path.islink(git_dir) == True:
        print 'Not found .git in ' + dir
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description='Add .gitkeep to empty directories.')

    subparsers = parser.add_subparsers(title='commands', metavar='command')

    parser_list = subparsers.add_parser('list', help='list candidates')
    parser_list.set_defaults(func=list)
    parser_list.add_argument('--dir', type=str, help='path to git directory', default=os.getcwd())

    parser_keep = subparsers.add_parser('keep', help='')
    parser_keep.set_defaults(func=keep)
    parser_keep.add_argument('--dir', type=str, help='path to git directory', default=os.getcwd())
    parser_keep.add_argument('--keeper', type=str, help='dummy file name. Default is ".gitkeep"', default='.gitkeep')

    args = parser.parse_args()
    args.dir = args.dir.rstrip('/')

    check_git_dir(args.dir)

    args.func(args)

if __name__ == "__main__":
    main()