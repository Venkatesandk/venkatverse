import Script from "next/script";
import { DEFAULT_THEME_ID, THEME_PRESETS } from "@/lib/themes";

export function ThemeScript() {
  const themeMap = Object.fromEntries(THEME_PRESETS.map((t) => [t.id, t.vars]));

  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {`(function(){
  try {
    var id = localStorage.getItem("vv-theme") || "${DEFAULT_THEME_ID}";
    var themes = ${JSON.stringify(themeMap)};
    var vars = themes[id] || themes["${DEFAULT_THEME_ID}"];
    var root = document.documentElement;
    root.setAttribute("data-theme", id);
    if (vars) {
      for (var k in vars) {
        if (Object.prototype.hasOwnProperty.call(vars, k)) {
          root.style.setProperty(k, vars[k]);
        }
      }
    }
  } catch(e) {}
})();`}
    </Script>
  );
}
