const NavButton = ({ title, icon }) => {
  return (
    <div>
      <button
        type="button"
        title={title}
        className="
          w-8
          h-8
          border
          border-(--border)
          rounded-lg
          bg-(--surface-2)
          text-(--ink-2)
          flex
          items-center
          justify-center
          text-[14px]
          [transition:all_var(--trans)]
          hover:border-(--brand)
          hover:text-(--brand)
          hover:bg-(--brand-wash)
        "
      >
        {icon}
      </button>
    </div>
  );
};

export default NavButton;
