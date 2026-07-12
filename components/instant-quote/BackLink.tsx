interface BackLinkProps {
  onClick: () => void;
}

export function BackLink({ onClick }: BackLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 text-sm text-[#374151] transition-colors duration-200 hover:text-[#2563EB] hover:underline"
    >
      ← Back
    </button>
  );
}
