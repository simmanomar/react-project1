// REVIEW: This component is very thin — it only renders a static <h1>. That's fine for now,
// but if you plan to add navigation, a search bar, or a logo, consider building it out here.
// Also, the .footer CSS class exists in index.css but is never used in any component — was a footer
// component planned for this file or elsewhere?

function Header() {
  return (
    <header>
      <h1>My favorite albums 💿 </h1>
    </header>
  );
}

export default Header;
