export function Label({ label }) {
	return (
		<>
			<span className="label" style={{ background: `#${label.color}` }}>
				{label.name}
			</span>
			<style jsx>{`
				.label {
					display: inline-block;
					line-height: 20px;
					margin-left: 15px;
					padding: 3px 10px;
					border-radius: 3px;
					font-size: 14px;
				}
			`}</style>
		</>
	);
}
