import type { FC } from "react";

export const AvatarPlaceholder: FC = ({}) => {
  return (
    <svg
      className="pointer-events-none h-full w-full rounded-full fill-primary-dark"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="256" height="256" />
      <path
        className="fill-white"
        d="M191.158 178.616C183.033 164.355 170.346 153.244 155.139 147.07C162.701 141.399 168.287 133.491 171.106 124.468C173.924 115.445 173.833 105.764 170.843 96.7965C167.854 87.8287 162.119 80.0287 154.45 74.5015C146.782 68.9743 137.568 66 128.115 66C118.663 66 109.449 68.9743 101.781 74.5015C94.112 80.0287 88.3769 87.8287 85.3876 96.7965C82.3984 105.764 82.3065 115.445 85.125 124.468C87.9436 133.491 93.5297 141.399 101.092 147.07C85.8849 153.244 73.1977 164.355 65.0726 178.616C64.5691 179.425 64.2336 180.328 64.0859 181.269C63.9382 182.211 63.9813 183.173 64.2128 184.098C64.4443 185.023 64.8593 185.892 65.4333 186.653C66.0072 187.414 66.7284 188.052 67.5538 188.529C68.3793 189.006 69.2922 189.312 70.2383 189.429C71.1844 189.546 72.1444 189.472 73.0612 189.21C73.978 188.949 74.8329 188.506 75.575 187.907C76.3172 187.309 76.9314 186.568 77.3813 185.727C88.1196 167.166 107.083 156.096 128.115 156.096C149.148 156.096 168.111 167.172 178.85 185.727C179.825 187.295 181.371 188.422 183.162 188.87C184.953 189.318 186.848 189.053 188.446 188.129C190.045 187.205 191.221 185.697 191.727 183.921C192.234 182.146 192.03 180.243 191.158 178.616ZM97.2993 111.057C97.2993 104.962 99.1066 99.004 102.493 93.9363C105.879 88.8686 110.692 84.9188 116.323 82.5864C121.954 80.254 128.15 79.6437 134.127 80.8328C140.105 82.0218 145.596 84.9568 149.906 89.2665C154.216 93.5763 157.151 99.0672 158.34 105.045C159.529 111.023 158.918 117.219 156.586 122.85C154.254 128.481 150.304 133.294 145.236 136.68C140.168 140.066 134.21 141.873 128.115 141.873C119.945 141.864 112.113 138.614 106.336 132.837C100.558 127.06 97.3087 119.227 97.2993 111.057Z"
      />
    </svg>
  );
};
