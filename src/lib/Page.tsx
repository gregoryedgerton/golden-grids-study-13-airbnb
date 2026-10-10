import type { ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { Credits } from "./modules";
import { Icon } from "../icons";
import { NAV, PAGES, REFERENCE } from "../content";
import { useSaved } from "./saved";
import { useFontsReady } from "./fonts";

/**
 * The shell. The reference's is a mark at the left, three tabs in the
 * middle and an account button at the right, over a search bar; its footer
 * is three columns of links. Here the tabs are the study's three pages, the
 * account button is the count of saved stays (there is no account), and the
 * footer's columns say what the study is, what it was read from and where
 * the library is.
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
          <div>
            <h2>This study</h2>
            <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
          </div>
          <div>
            <h2>The reference</h2>
            <ul>{Object.values(REFERENCE).map((r) => <li key={r.url}><a href={r.url}>{r.label}</a></li>)}</ul>
          </div>
          <div>
            <h2>Golden Grids</h2>
            <ul>
              <li><a href="https://github.com/gregoryedgerton/golden-grids">The library</a></li>
              <li><a href="https://github.com/gregoryedgerton/golden-grids#showcase">Other layout studies</a></li>
              <li><a href="https://github.com/gregoryedgerton/golden-grids-study-13-airbnb">This study's source</a></li>
            </ul>
          </div>
        </div>
        <div className="wrap foot__base"><span>GIFbnb, a layout study</span><span>English (US)</span><span>$ USD</span></div>
      </footer>
      <StudyDisclosure>
        <p>This page follows <a href={source.url}>{source.label}</a> as it was shown on October 9, 2026.</p>
        <Credits />
      </StudyDisclosure>
    </>
  );
}
