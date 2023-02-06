export default function UpSvg({ classes }: { classes: string }) {
  return (
    <div className="pointer-events-none h-6 w-6">
      <svg id="up-svg" role="img" aria-label="Move Up" height="100%" width="100%" viewBox="0 0 16 16  ">
        <path
          d="M 2,8
L 8,2 
L 14,8 
h -3
v 6
h -6
v -6
z"
          className={classes}
        />
      </svg>
    </div>
  );
}
