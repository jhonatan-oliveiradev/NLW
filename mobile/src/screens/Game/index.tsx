import { TouchableOpacity, Image, View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { Entypo } from "@expo/vector-icons";

import { Heading } from "../../components/Heading";

import { useEffect, useState } from "react";
import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { THEME } from "../../theme";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
	const [duos, setDuos] = useState<DuoCardProps[]>([]);

	const navigation = useNavigation();

	const route = useRoute();
	const game = route.params as GameParams;

	function handleGoBack() {
		navigation.goBack();
	}

	useEffect(() => {
		fetch(`http://10.0.0.139:3333/games/${game.id}/ads`)
			.then((res) => res.json())
			.then((data) => setDuos(data));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleGoBack}>
					<Entypo
						name="chevron-left"
						color={THEME.COLORS.CAPTION_300}
						size={20}
					/>
				</TouchableOpacity>

				<Image source={logoImg} style={styles.logo} />

				<View style={styles.right} />
			</View>

			<Image
				source={{ uri: game.bannerUrl }}
				style={styles.cover}
				resizeMode="cover"
			/>

			<Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

			<FlatList
				data={duos}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <DuoCard data={item} onConnect={() => {}} />}
				horizontal
				style={styles.containerList}
				contentContainerStyle={[
					duos.length > 0 ? styles.contentList : styles.emptyListContent,
				]}
				showsHorizontalScrollIndicator={false}
				ListEmptyComponent={() => (
					<Text style={styles.emptyListText}>
						Ainda não há anúncios publicados para este jogo.
					</Text>
				)}
			/>
		</SafeAreaView>
	);
}
