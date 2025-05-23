import { ReactNode, ComponentType } from "react";
import { Link } from "@/i18n/routing";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import Separator from "./Separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Locale } from "@/types";

interface Props {
  title: string;
  href?: string;
  children?: ReactNode;
  Icon?: ComponentType<{ className?: string }>;
  desktopHidden?: boolean;
  language?: Locale;
}

export default function ProfileItem({
  title,
  href,
  children,
  Icon,
  desktopHidden,
  language,
}: Props) {
  if (href) {
    return (
      <div className={desktopHidden ? "md:hidden" : ""}>
        <Link href={href} locale={language}>
          <div className="flex-row-between px-4">
            <p className="text-lg flex items-center gap-x-2">
              {Icon && <Icon className="size-6 text-primary" />} {title}
            </p>
            <ChevronDownIcon className="size-4 ltr:-rotate-90 rtl:rotate-90 text-custom-black pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200" />
          </div>
        </Link>
        <Separator className="my-4" />
      </div>
    );
  }

  return (
    <div className={desktopHidden ? "md:hidden" : ""}>
      <Accordion type="single" collapsible>
        <AccordionItem value={title}>
          <AccordionTrigger className="py-0 cursor-pointer px-4 items-center">
            <p className="text-lg flex items-center gap-x-2">
              {Icon && <Icon className="size-6 text-primary" />} {title}
            </p>
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator className="my-4" />
    </div>
  );
}
