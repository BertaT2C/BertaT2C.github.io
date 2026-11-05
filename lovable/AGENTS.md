<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Portfolio content (projects, filter groups, process steps) lives in `src/data/projects.ts`; components only render it — keeps copy edits in one place.
- Full case studies stay on the original GitHub Pages site and are linked externally; this app shows previews only — avoids duplicating long content.
- Scroll-in animations use the `Reveal` component (IntersectionObserver + `.reveal` CSS), respecting `prefers-reduced-motion` — one consistent motion system.