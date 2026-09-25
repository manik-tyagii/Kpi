function Toast({ message, visible }) {
  if (!visible) {
    return null;
  }

  return (
    <div
      id="toast"
      className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2

        z-[300]

        bg-[#111113]
        text-white

        px-[18px]
        py-[10px]

        rounded-[20px]

        text-[13px]
        font-medium

        shadow-[0_2px_8px_rgba(0,0,0,0.10),0_12px_32px_rgba(0,0,0,0.10)]

        transition-all
        duration-300

        whitespace-nowrap
      "
    >
      <span className="text-[#E20074] mr-2">✓</span>
      {message}
    </div>
  );
}

export default Toast;
