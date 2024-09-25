const NotificationBadge = ({
  icon,
  count,
}: {
  icon: JSX.Element;
  count: number;
}) => {
  return (
    <span className="cursor-pointer relative">
      {count > 0 && (
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[8px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          {count}
        </div>
      )}
      {icon}
    </span>
  );
};

export default NotificationBadge;
