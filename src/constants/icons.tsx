import {
  SpotifyLogo,
  TwitchLogo,
  YoutubeLogo,
  AmazonLogo,
  AppleLogo,
  TwitterLogo,
  OpenAiLogo,
  DribbbleLogo,
  CurrencyDollar,
} from "@phosphor-icons/react/dist/ssr";

export const Netflix = () => (
  <>
    <div className="h-4 w-4 text-red-600">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        role="img"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"></path>
      </svg>
    </div>
  </>
);

export const Apple = () => (
  <>
    <div className="h-4 w-4 text-white">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        role="img"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"></path>
      </svg>
    </div>
    <span>Apple</span>
  </>
);
export const Adobe = () => (
  <>
    <div className="h-4 w-4 text-red-400">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        role="img"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z"></path>
      </svg>
    </div>
  </>
);

export const SERVICE_ICONS = {
  netflix: Netflix,
  spotify: SpotifyLogo,
  youtube: YoutubeLogo,
  twitch: TwitchLogo,
  amazon: AmazonLogo,
  apple: AppleLogo,
  twitter: TwitterLogo,
  openai: OpenAiLogo,
  dribbble: DribbbleLogo,
  adobe: Adobe,
  other: CurrencyDollar,
};

export type ServiceId = keyof typeof SERVICE_ICONS;

export const renderServiceIcon = (serviceId: ServiceId) => {
  const ServiceIcon = SERVICE_ICONS[serviceId];
  return <ServiceIcon size={18} />;
};
