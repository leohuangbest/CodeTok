import { createNavigation } from 'next-intl/navigation'
import { locales, localePrefix } from './config'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales, localePrefix }) 