import React, {FC, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {useUserDataProfile} from '../player';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../screens";

interface Props {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  stoneId: string;
}

export const AddToCollectionModal: FC<Props> = ({
  opened,
  setOpened,
  stoneId,
}) => {
  const {navigateToScreen} = useReactNativeNavigation();
  const {userProfile, setUserProfile} = useUserDataProfile();
  const [selectedCollection, setSelectedCollection] = useState(
    (userProfile?.collections || [])[0]?.id,
  );
  const {navigate} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreensRoads.Collection>
    >();
  return (
    <Modal
      visible={opened}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setOpened(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View
            style={{
              width: '100%',
              paddingTop: 19,
              paddingHorizontal: 16,
              alignItems: 'center',
            }}>
            <Text style={styles.modalTitle}>Add stone to collection</Text>
            <Text style={styles.modalSubtitle}>
              To add a stone to a collection, select one of them or create a new
              one
            </Text>

            <View style={styles.pickerWrapper}>
              <Picker
                dropdownIconColor="transparent"
                selectedValue={selectedCollection}
                placeholder="Collection"
                onValueChange={itemValue => setSelectedCollection(itemValue)}
                style={styles.picker}>
                {(userProfile?.collections || []).map((collection, index) => (
                  <Picker.Item
                    label={collection.title}
                    value={collection.id}
                    key={index}
                  />
                ))}
              </Picker>
              {!selectedCollection ? (
                <Text style={styles.placeholder}>Select a collection</Text>
              ) : null}
              <Image
                source={require('../shared/assets/chevrondown.png')}
                style={styles.chevron}
              />
            </View>
          </View>

          <TouchableOpacity
            disabled={!selectedCollection}
            style={styles.saveButton}
            onPress={async () => {
              if (!userProfile) {
                setOpened(false);
                return;
              }
              const foundCollection = userProfile.collections.find(
                ({id}) => id === selectedCollection,
              );
              if (!foundCollection?.stones.includes(stoneId)) {
                await setUserProfile({
                  ...userProfile,
                  collections: userProfile.collections.map(collection => {
                    if (collection.id === selectedCollection) {
                      return {
                        ...collection,
                        stones: [...collection.stones, stoneId],
                      };
                    }
                    return collection;
                  }),
                });
                setOpened(false);
                navigateToScreen(ScreensRoads.Collection);
                return;
              }
              navigateToScreen(ScreensRoads.Collection);
              setOpened(false);
            }}>
            <Text
              style={[
                styles.saveButtonText,
                {
                  color: selectedCollection ? '#A45DFB' : '#ccc',
                },
              ]}>
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              setOpened(false);
              navigate(ScreensRoads.CreateCollection);
            }}>
            <Text style={styles.createButtonText}>Create new collection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setOpened(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  openButton: {
    padding: 15,
    backgroundColor: '#A45DFB',
    borderRadius: 10,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2B0C30',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
  },
  pickerWrapper: {
    backgroundColor: '#220B25',
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    color: '#fff',
  },
  saveButton: {
    borderTopWidth: 1,
    height: 44,
    borderTopColor: 'rgba(128, 128, 128, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#A45DFB',
    fontSize: 17,
  },
  createButton: {
    borderTopWidth: 1,
    height: 44,
    borderTopColor: 'rgba(128, 128, 128, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  createButtonText: {
    color: '#A45DFB',
    fontSize: 17,
  },
  cancelButton: {
    borderTopWidth: 1,
    height: 44,
    borderTopColor: 'rgba(128, 128, 128, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FB5D5D',
    fontSize: 17,
  },
  placeholder: {
    color: '#ccc',
    position: 'absolute',
    fontSize: 16,
    left: 20,
    top: '50%',
    transform: [{translateY: -10}],
  },
  chevron: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
    width: 20,
    height: 20,
    tintColor: '#fff', // Optional: Adjust the color of the chevron
  },
});
