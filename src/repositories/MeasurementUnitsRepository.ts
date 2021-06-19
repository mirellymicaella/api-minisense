import { EntityRepository, Repository } from 'typeorm';
import { MeasurementUnit } from '../models/MeasurementUnit';

@EntityRepository(MeasurementUnit)
class MeasurementUnitsRepository extends Repository<MeasurementUnit> {
    createAndSave(symbol: string, description: string) {
        const unit = new MeasurementUnit();
        unit.symbol = symbol;
        unit.description = description;
        return this.manager.save(unit);
    }

    findById(id: number) {
        return this.findOne({ id });
    }

    findBySymbol(symbol: string) {
        return this.findOne({ symbol });
    }
}

export { MeasurementUnitsRepository };
