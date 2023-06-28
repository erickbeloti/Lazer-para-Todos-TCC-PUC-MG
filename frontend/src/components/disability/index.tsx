import AuditivaSvg from '../../../public/disabilities/auditiva.svg';
import AutismoSvg from '../../../public/disabilities/autismo.svg';
import FisicaSvg from '../../../public/disabilities/fisica.svg';
import Idoso80Svg from '../../../public/disabilities/idoso80.svg';
import IntelectualSvg from '../../../public/disabilities/intelectual.svg';
import VisualSvg from '../../../public/disabilities/visual.svg';

interface DisabilityIconProps {
	type: string;
	elabled?: boolean;
	size?: number;
}

export default function DisabilityIcon({
	type,
	elabled = true,
	size = 40,
}: DisabilityIconProps) {
	const fill = elabled ? '#000' : 'rgb(0 0 0 / 35%)';

	if (type === 'Física') {
		return <FisicaSvg fill={fill} width={size} height={size} />;
	} else if (type === 'Auditiva') {
		return <VisualSvg fill={fill} width={size} height={size} />;
	} else if (type === 'Visual') {
		return <AuditivaSvg fill={fill} width={size} height={size} />;
	} else if (type === 'Intelectual') {
		return <Idoso80Svg fill={fill} width={size} height={size} />;
	} else if (type === 'Autismo') {
		return <IntelectualSvg fill={fill} width={size} height={size} />;
	} else if (type === 'Idoso 80+') {
		return <AutismoSvg fill={fill} width={size} height={size} />;
	}

	return null;
}
