import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture, Clone, useAspect } from "@react-three/drei";
import state from "../store";

const PhoneCase = () => {
    const snap = useSnapshot(state);
    const { nodes } = useGLTF("/free_iphone_case.glb");
    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    const fullRef = useRef();
    const insideRef = useRef();

    useFrame((state, delta) => {
        easing.dampC(fullRef?.current.color, snap.color, 0.25, delta);
        easing.dampC(insideRef?.current.color, snap.color, 0.25, delta);
    });

    const stateString = JSON.stringify(snap);

    return (
        <Clone
            object={nodes["0cd7d5feeaf941618f218222063c569eobjcleanermaterialmergergles"]}
            scale={0.18}
            position={[0, 0, 0]}
            rotation={[30, 0, 0]}
            inject={
                <group key={stateString}>
                    <mesh castShadow geometry={nodes.Object_3.geometry} material-roughness={1} dispose={null} scale={1}>
                        <meshStandardMaterial ref={fullRef} position={[-2, 0, 0]} rotation={[20, 0, 0]} scale={1} />

                        {snap.isFullTexture && (
                            <Decal position={[-2, 0.01, 0]} rotation={[2, 0, 0]} scale={4} map={fullTexture} />
                        )}
                        {snap.isLogoTexture && (
                            <Decal
                                position={[-2, 0.01, 0]}
                                rotation={[2, 0, 0]}
                                scale={1}
                                map={logoTexture}
                                map-anisotropy={16}
                                depthTest={false}
                                depthWrite={true}
                            />
                        )}
                    </mesh>
                    <mesh geometry={nodes.Object_2.geometry} material-roughness={1} dispose={null}>
                        <meshLambertMaterial ref={insideRef} position={[0, 0, 0]} rotation={[20, 0, 0]} scale={1} />
                    </mesh>
                </group>
            }
        ></Clone>
    );
};

export default PhoneCase;
