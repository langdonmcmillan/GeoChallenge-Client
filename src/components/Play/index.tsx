import * as React from "react";
import { connect } from "react-redux";

import GameOptions from "./GameOptions";
import GameMap from "./GameMap";
import { StoreState } from "../../reducers";

interface Props {
    isNewGame: boolean;
}

export class Play extends React.Component<Props> {
    render() {
        return (
            <div>{this.props.isNewGame ? <GameOptions /> : <GameMap />}</div>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    let isNewGame = true;
    isNewGame = state.game._id === undefined;
    return { isNewGame };
};

export default connect(mapStateToProps, null)(Play as any);
