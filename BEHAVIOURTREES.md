# Behavoir trees

Legenda:
```mermaid
flowchart TD
    MultiCheck{Multi check}
    Check[/Check/]
    Task[Task]
```

## Units

### Swordsman

```mermaid
flowchart TD
Tree((Tree))
  Selector1{Selector}
    Sequence1{Sequence}
      IsEnemyInAggroRange1[/IsEnemyInAggroRange/]
      SetTarget[SetTarget]
    Sequence2{Sequence}
      Inverter1[/Invert/]
        IsMoving[/IsMoving/]
      Inverter2[/Invert/]
        IsEnemyInFovRange2[/IsEnemyInAggroRange/]
      UnsetTarget[UnsetTarget]
    Sequence3{Sequence}
      HasTarget[/HasTarget/]
      Selector2{Selector}
        Sequence4{Sequence}
        IsEnemyInAttackRange[/IsEnemyInAttackRange/]
        Timer[/Timer/]
          Attack[Attack]
        Follow[Follow]

Tree --> Selector1
  Selector1 --> Sequence1
    Sequence1 --> IsEnemyInAggroRange1
    Sequence1 --> SetTarget
  Selector1 --> Sequence2
    Sequence2 --> Inverter1
    Inverter1 --> IsMoving
    Sequence2 --> Inverter2
      Inverter2 --> IsEnemyInFovRange2
    Sequence2 --> UnsetTarget
  Selector1 --> Sequence3
    Sequence3 --> HasTarget
    Sequence3 --> Selector2
      Selector2 --> Sequence4
        Sequence4 --> IsEnemyInAttackRange
        Sequence4 --> Timer
          Timer --> Attack
      Selector2 --> Follow
 
```