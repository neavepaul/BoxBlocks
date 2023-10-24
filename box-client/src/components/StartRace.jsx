import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

const StartRace = () => {
    const { contract } = useContract(
        "0x019A3D456C1b763153769013d88F041992724E70"
    );
    const { mutateAsync: startRace, isLoading } = useContractWrite(
        contract,
        "startRace"
    );
    const [status, setStatus] = useState(null);

    const handleStartRace = async () => {
        setStatus("loading");
        try {
            await startRace({ args: [] });
            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div>
            <h2>Start Race</h2>
            <button onClick={handleStartRace} disabled={isLoading}>
                {isLoading ? "Starting Race..." : "Start Race"}
            </button>
            {status === "success" && <p>Race started successfully!</p>}
            {status === "error" && (
                <p>Error starting the race. Please try again.</p>
            )}
        </div>
    );
};

export default StartRace;
