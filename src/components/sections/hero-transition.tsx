export function HeroTransition() {
    return (
        <div className="absolute bottom-0 left-0 w-full h-auto text-primary" style={{ transform: 'translateY(1px)' }}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1440 130"
                preserveAspectRatio="none"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M0 0H1440V130L720 30L0 130V0Z" />
            </svg>
        </div>
    );
}
