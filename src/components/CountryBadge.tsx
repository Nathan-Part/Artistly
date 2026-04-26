interface CountryBadgeProps {
  country: string;
  countryCode?: string | null;
  className?: string;
  textClassName?: string;
  flagClassName?: string;
}

function CountryBadge({
  country,
  countryCode,
  className = "",
  textClassName = "",
  flagClassName = "",
}: CountryBadgeProps) {
  return (
    <span className={className}>
      {countryCode && (
        <img
          src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
          alt={`${country} flag`}
          className={flagClassName}
        />
      )}
      <span className={textClassName}>{country}</span>
    </span>
  );
}

export default CountryBadge;
