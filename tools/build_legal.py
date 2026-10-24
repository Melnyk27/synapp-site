#!/usr/bin/env python3
"""Build privacy.html and terms.html from legal/*.md.

The texts are kept in Claude Docs (TakeSync — Privacy Policy, TakeSync — EULA);
paste their English part into legal/*.md, then run:

    python3 tools/build_legal.py           # refuses while [PLACEHOLDERS] remain
    python3 tools/build_legal.py --draft   # builds anyway, marked Draft + noindex

Needs: pip install markdown
"""
import html, pathlib, re, sys
import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = {"privacy": "legal/privacy.md", "terms": "legal/terms.md", "refund": "legal/refund.md"}
PLACEHOLDER = re.compile(r"\[(?!\s*\]|x\])[^\]\n]*\](?!\()")  # [TEXT] not followed by (url)

TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — TakeSync</title>
<meta name="description" content="{description}">
{robots}<meta name="theme-color" content="#0e1014">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css?v=20261024b">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="nav-wrap">
  <nav class="nav container" aria-label="Main">
    <a href="/" class="brand" aria-label="TakeSync home">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#15181d"/><rect x="5" y="9" width="2.4" height="10" rx="1.2" fill="#5b9cff"/><rect x="9" y="6" width="2.4" height="16" rx="1.2" fill="#4fd58a"/><rect x="13" y="10" width="2.4" height="8" rx="1.2" fill="#5b9cff"/><rect x="17" y="5" width="2.4" height="18" rx="1.2" fill="#4fd58a"/><rect x="21" y="9" width="2.4" height="10" rx="1.2" fill="#5b9cff"/></svg>
      TakeSync
    </a>
    <a href="/#download" class="btn btn-primary btn-sm legal-cta">Download</a>
  </nav>
</header>
<main id="main" class="container narrow legal">
{draft}  <h1>{title}</h1>
  <p class="legal-updated">Last updated: {updated}</p>
{body}
</main>
<footer class="footer">
  <div class="container footer-row">
    <span>© 2026 TakeSync</span>
    <div class="footer-links">
      <a href="mailto:support@takesync.uk">Support</a>
      <a href="/privacy">Privacy policy</a>
      <a href="/terms">Terms of use</a>
      <a href="/refund">Refund policy</a>
    </div>
  </div>
</footer>
</body>
</html>
"""


def front_matter(text):
    meta, body = {}, text
    if text.startswith("---\n"):
        head, body = text[4:].split("\n---\n", 1)
        for line in head.splitlines():
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip()
    return meta, body


def main():
    draft = "--draft" in sys.argv
    problems = []
    for name, src in PAGES.items():
        meta, body = front_matter((ROOT / src).read_text(encoding="utf-8"))
        left = sorted(set(PLACEHOLDER.findall(body + meta.get("updated", ""))))
        if left:
            problems.append(f"{src}: {', '.join(left)}")
        html_body = markdown.markdown(body, extensions=["tables", "sane_lists"])
        # external links open in a new tab
        html_body = re.sub(r'<a href="(https?://[^"]+)">', r'<a href="\1" target="_blank" rel="noopener">', html_body)
        page = TEMPLATE.format(
            title=html.escape(meta.get("title", name)),
            description=html.escape(meta.get("description", "")),
            updated=html.escape(meta.get("updated", "")),
            robots='<meta name="robots" content="noindex">\n' if left else "",
            draft='  <p class="legal-draft">Draft — not yet in force.</p>\n' if left else "",
            body="\n".join("  " + l if l else l for l in html_body.splitlines()),
        )
        if left and not draft:
            continue
        (ROOT / f"{name}.html").write_text(page, encoding="utf-8")
        print(f"wrote {name}.html" + (" (DRAFT)" if left else ""))
    if problems:
        print("\nPlaceholders still to fill:\n  " + "\n  ".join(problems))
        if not draft:
            sys.exit("Refusing to build final pages. Fill them in, or pass --draft.")


if __name__ == "__main__":
    main()
