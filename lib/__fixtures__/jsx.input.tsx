const SOME_CSS = 'absolute';
export default (
  <div>
    <div className={SOME_CSS}>
      <p
        className="
          absolute
          bg-[
            linear-gradient(
              to_right,
              theme(colors.zinc.900/50%),
              transparent,
            ),
            linear-gradient(
              to_right,
              theme(colors.purple.600/70%),
              theme(colors.purple.800/20%)_32px,
              transparent_50%,
            ),
          ]
          bg-[size:16px_16px]
          !text-purple-900
        "
      >
        foo bar baz
      </p>
    </div>
  </div>
)
