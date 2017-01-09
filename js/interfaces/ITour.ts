/// <reference path="../../typings/index.d.ts" />

interface ITourState {
	foundTarget: boolean,
	style: React.CSSProperties
}

interface ITourProps {
	tour: ITour,
	stepIndex: number
}

interface ITour {
	id: string,
	steps: Array<ITourStep>,
	currentStep: number
}

interface ITourStep {
	target: string,
	title: string,
	content: string,
	placement: string,
	showNext: boolean,
	showBack: boolean,
	offset: number,
	align: string,
	order: number
}