/**
 * Props every dashboard template accepts.
 *
 * This lives on its own rather than beside one template, because each template
 * can be ejected independently — importing the shared type from a sibling
 * template would drag that template along with it.
 */
export interface TemplateProps {
  brandName?: string;
  userName?: string;
  className?: string;
}
