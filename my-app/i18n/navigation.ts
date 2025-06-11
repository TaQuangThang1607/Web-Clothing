import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';
 // i18n/navigation.ts
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);