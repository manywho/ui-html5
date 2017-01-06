/// <reference path="../../typings/index.d.ts" />

interface ITourState {
	foundTarget: boolean,
	style: React.CSSProperties
}

interface ITourProps {
	tour: any,
	stepIndex: number
}