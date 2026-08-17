type OwnerReviewSpecimenProps = Readonly<{
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  returnHref: string;
  returnLabel: string;
}>;

/** Physical review fixtures do not become customer destinations or duplicate compositions. */
export function OwnerReviewSpecimen({ id, eyebrow, title, copy, returnHref, returnLabel }: OwnerReviewSpecimenProps) {
  return (
    <main data-owner-review-specimen={id} id="main-content">
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{copy}</p>
          <div className="button-row"><a className="button" href={returnHref}>{returnLabel} <span aria-hidden="true">→</span></a></div>
        </div>
      </section>
    </main>
  );
}
