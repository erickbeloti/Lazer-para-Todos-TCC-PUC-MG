import AuditivaSvg from '../../../public/disabilities/auditiva.svg';
import AutismoSvg from '../../../public/disabilities/autismo.svg';
import FisicaSvg from '../../../public/disabilities/fisica.svg';
import Idoso80Svg from '../../../public/disabilities/idoso80.svg';
import IntelectualSvg from '../../../public/disabilities/intelectual.svg';
import VisualSvg from '../../../public/disabilities/visual.svg';

interface DisabilityIconProps {
	type: string;
}

export default function DisabilityIcon({ type }: DisabilityIconProps) {
	if (type === 'Física') {
		return <FisicaSvg width={40} height={40} />;
	} else if (type === 'Auditiva') {
		return <VisualSvg width={40} height={40} />;
	} else if (type === 'Visual') {
		return <AuditivaSvg width={40} height={40} />;
	} else if (type === 'Intelectual') {
		return <Idoso80Svg width={40} height={40} />;
	} else if (type === 'Autismo') {
		return <IntelectualSvg width={40} height={40} />;
	} else if (type === 'Idoso 80+') {
		return <AutismoSvg width={40} height={40} />;
	}

	return null;
}
