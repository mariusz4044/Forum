export function UserNick({
  nickname,
  role,
}: {
  nickname: string;
  role?: string;
}) {
  let className = `capitalize`;

  if (role) {
    className += ` ${role}`;
  }

  return <span className={className}>{nickname}</span>;
}
