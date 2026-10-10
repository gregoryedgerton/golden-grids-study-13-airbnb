import type { ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { Credits } from "./modules";
import { Icon } from "../icons";
import { NAV, PAGES } from "../content";

/** The reference's footer columns, for show. Only the study's own pages are links. */
const FOOT: [string, string[]][] = [
  ["Support", ["Help Center", "Safety", "Cancellation options", "Disability support"]],
  ["Hosting", ["List your home", "Hosting resources", "Community forum", "Hosting responsibly"]],
];
import { useSaved } from "./saved";
import { useFontsReady } from "./fonts";

/**
 * The shell. The reference's is a mark at the left, three tabs in the
 * middle and an account button at the right, over a search bar; its footer
 * is three columns of links. Here the tabs are the study's three pages, the
 * account button is the count of saved stays (there is no account), and the
 * footer's columns are the reference's, for show, beside the study's own
 * three pages. Nothing in the shell leaves for the reference: its pages are
 * linked only from the notice and the disclosure.
 */
export function Page({ current, source, bar, children }: { current: string; source: { label: string; url: string }; bar?: ReactNode; children: ReactNode }) {
  useFontsReady(["400 1em Figtree", "600 1em Figtree", "800 1em Figtree"]);
  const saved = useSaved();
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      <header className="top">
        <div className="wrap top__bar">
          <a className="wordmark" href={PAGES.home}>GIFbnb</a>
          <nav className="nav" aria-label="Primary">
            <ul>{NAV.map((n) => <li key={n.href}><a href={n.href} aria-current={n.href === current ? "page" : undefined}><Icon name={n.icon} size={22} />{n.label}</a></li>)}</ul>
          </nav>
          <a className="top__saved" href={`${PAGES.search}?saved`}><Icon name="heart" size={18} /><span>Saved</span><span className="top__count">{saved.length}</span></a>
        </div>
      </header>
      {bar}
      <main id="content">{children}</main>
      <footer className="foot">
        <div className="wrap foot__cols">
          {FOOT.map(([title, items]) => (
            <div key={title}>
              <h2>{title}</h2>
              <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
          <div>
            <h2>GIFbnb</h2>
            <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
        </div>
        <div className="wrap foot__base"><span>© 2026 GIFbnb</span><span>English (US)</span><span>$ USD</span></div>
      </footer>
      <StudyDisclosure>
        <p>This page follows <a href={source.url}>{source.label}</a> as it was shown on October 9, 2026.</p>
        <Credits />
      </StudyDisclosure>
    </>
  );
}
