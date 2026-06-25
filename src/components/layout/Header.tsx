import Logo from "../common/Logo";
import ThemeToggleDropdown from "../common/ThemeToggleDropdown";
import { Typography } from "../common/Typography";

const app_version = import.meta.env.VITE_APP_VERSION ?? "0.0.1";

export default function Header() {
  return (
    <header className="relative mx-4 md:mx-8 mt-2 md:mt-4 rounded-full bg-background/30 px-4 md:px-8 h-14 md:h-18 border-t border-secondary-foreground/30 backdrop-blur-3xl flex-center-between z-50 max-w-7xl xl:mx-auto">
      <div className="flex-row-center gap-x-3">
        <Logo />
        <Typography variant="h2">
          Res<span className="text-primary">Type</span>
          <Typography className="ml-1" variant="caption-xxs">
            v{app_version}
          </Typography>
        </Typography>
      </div>

      <ThemeToggleDropdown />
    </header>
  )
}
